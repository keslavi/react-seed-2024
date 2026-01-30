#!/usr/bin/env node

/**
 * Prompt Context Validator
 * Ensures developers reference appropriate context prompts when using AI assistants
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

class PromptValidator {
  constructor() {
    this.requiredPrompts = [
      'prompt.md',
      'promptFormhelper.md'
    ];
    
    this.specializedPrompts = {
      'formhelper': ['promptFormhelper.md'],
      'test': ['promptTesting.md'],
      'msw': ['promptMSW.md'],
      'scss': ['promptSCSS.md']
    };
  }

  /**
   * Validate that prompt files exist and are current
   */
  validatePromptFiles() {
    console.log('🔍 Validating prompt files...');
    
    const missingPrompts = [];
    const outdatedPrompts = [];
    
    this.requiredPrompts.forEach(prompt => {
      if (!existsSync(prompt)) {
        missingPrompts.push(prompt);
      } else {
        // Check if prompt was modified in last 30 days
        const stats = execSync(`git log -1 --format="%ct" ${prompt}`, { encoding: 'utf8' });
        const lastModified = parseInt(stats.trim()) * 1000;
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        
        if (lastModified < thirtyDaysAgo) {
          outdatedPrompts.push(prompt);
        }
      }
    });
    
    if (missingPrompts.length > 0) {
      console.error('❌ Missing required prompt files:', missingPrompts.join(', '));
      return false;
    }
    
    if (outdatedPrompts.length > 0) {
      console.warn('⚠️  Outdated prompt files (not updated in 30 days):', outdatedPrompts.join(', '));
    }
    
    console.log('✅ All required prompt files present');
    return true;
  }

  /**
   * Check if recent commits reference context prompts
   */
  validateCommitMessages() {
    console.log('🔍 Validating commit messages for prompt references...');
    
    try {
      const commits = execSync('git log --oneline -10', { encoding: 'utf8' });
      const lines = commits.split('\n').filter(line => line.trim());
      
      let promptReferences = 0;
      lines.forEach(line => {
        if (line.toLowerCase().includes('context:') || 
            line.toLowerCase().includes('prompt')) {
          promptReferences++;
        }
      });
      
      if (promptReferences === 0) {
        console.warn('⚠️  No recent commits reference context prompts');
        console.log('💡 Consider adding "Context: prompt.md" to commit messages');
        return false;
      }
      
      console.log(`✅ Found ${promptReferences} commits with prompt references`);
      return true;
    } catch (error) {
      console.error('❌ Error checking commit messages:', error.message);
      return false;
    }
  }

  /**
   * Validate code changes against prompt patterns
   */
  validateCodePatterns() {
    console.log('🔍 Validating code patterns...');
    
    try {
      // Check for proper naming conventions
      const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' });
      const jsFiles = stagedFiles.split('\n').filter(file => 
        file.endsWith('.js') || file.endsWith('.jsx')
      );
      
      let violations = [];
      
      jsFiles.forEach(file => {
        if (file.trim()) {
          const content = readFileSync(file, 'utf8');
          
          // Check for verb+noun naming (should be noun+modifier)
          const verbNounPattern = /(?:function|const|let|var)\s+(create|update|delete|get|set)([A-Z]\w+)/g;
          const matches = content.match(verbNounPattern);
          
          if (matches) {
            violations.push(`${file}: Found verb+noun naming: ${matches.join(', ')}`);
          }
        }
      });
      
      if (violations.length > 0) {
        console.error('❌ Naming convention violations:');
        violations.forEach(violation => console.error(`  - ${violation}`));
        return false;
      }
      
      console.log('✅ Code patterns follow prompt guidelines');
      return true;
    } catch (error) {
      console.error('❌ Error validating code patterns:', error.message);
      return false;
    }
  }

  /**
   * Run all validation checks
   */
  validate() {
    console.log('🚀 Starting prompt context validation...\n');
    
    const results = [
      this.validatePromptFiles(),
      this.validateCommitMessages(),
      this.validateCodePatterns()
    ];
    
    const allPassed = results.every(result => result === true);
    
    console.log('\n📊 Validation Summary:');
    console.log(`Prompt Files: ${results[0] ? '✅' : '❌'}`);
    console.log(`Commit Messages: ${results[1] ? '✅' : '❌'}`);
    console.log(`Code Patterns: ${results[2] ? '✅' : '❌'}`);
    
    if (allPassed) {
      console.log('\n🎉 All validations passed!');
      process.exit(0);
    } else {
      console.log('\n❌ Some validations failed. Please review and fix.');
      process.exit(1);
    }
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new PromptValidator();
  validator.validate();
}

export default PromptValidator;

