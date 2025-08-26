import Router from '@koa/router';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const r = new Router();

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define data directory path
const DATA_DIR = path.join(__dirname, '..', '..', 'data');

// In-memory task data storage
let taskData = [];

// Load task data from IIFE file
const loadData = () => {
    try {
        // Load task data
        const taskFilePath = path.join(DATA_DIR, 'task.js');
        const taskFileContent = fs.readFileSync(taskFilePath, 'utf8');
        taskData = eval(taskFileContent);
        
        console.log('Task data loaded from IIFE file');
    } catch (error) {
        console.error('Error loading task data from IIFE file:', error);
        // Fallback to empty data
        taskData = [];
    }
};

// Initialize data on startup
loadData();

const readData = () => {
    return taskData;
}

const writeData = (data) => {
    taskData = data;
    
    // Write data back to IIFE file format
    try {
        const taskFilePath = path.join(DATA_DIR, 'task.js');
        const iifeContent = `(() => ${JSON.stringify(data, null, 2)})()`;
        fs.writeFileSync(taskFilePath, iifeContent, 'utf8');
        console.log('Task data persisted to IIFE file');
    } catch (error) {
        console.error('Error writing task data to IIFE file:', error);
        throw new Error('Failed to persist task data');
    }
}

r.get('/:id', async (ctx, next) => {
    const data = readData()
        .filter(function (data) { return data.id == ctx.params.id })[0];

    ctx.body = data;
})

r.get('/', async (ctx, next) => {
    const data = readData().filter(x=>x.id!==0);
    ctx.body = data
})

//NOTE: in the environments i frequently work in, PUT and DELETE aren't available
//UPSERT/DELETE
r.post('/', async (ctx, next) => {
    let data = readData();
    const req = ctx.request.body;

    if (req.delete) {
        console.log('delete')
        data = data.filter(x=>x.id !== req.id );
        req.deleted = true;
    }
    else if ((req.id || '0') !== '0') {
        console.log('update',req);
        const item = data.find(x=>x.id == req.id);
        if (item) {
          Object.keys(req).forEach((key) => {
            item[key] = req[key] || "";
          });
        }
    }
    else {
        const idNew = Math.max.apply(Math, data.map(function (o) { return o.id; })) + 1;
        console.log('adding', idNew);

        req.id=idNew;
        req.status = Number(req.status ||0);
        req.result = Number(req.result ||0);
        data.push(req);
    }

    writeData(data);

    req.success = true;

    ctx.body = req;
})

export default r; 