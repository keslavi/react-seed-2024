import { Suspense } from "react";
import { TestHarness } from "./testHarness";
import ErrorBoundary from "./components/error-boundary";

//THIS IS NOT THE PATTERN FOR A FORM, USE TASK.JSX PATTERN.
//THIS IS FOR TESTING ONLY.

import {
  schemaDefault,
  optionDefault,
  itemDefault,
  ChildrenDefault,
} from './forms/defaults/lazyDefaults';
//} from './forms/defaults/defaults--public.jsx';

export const Formhelper = (props) => {
  return (<ErrorBoundary>
    <div>(formhelper tester)</div>
    <Suspense fallback={<div>Loading form defaults...</div>}>
      <TestHarness {...{
        item: props.item || itemDefault,
        schema: props.schema || schemaDefault,
        options: props.options || optionDefault,
      }}
        noRow={true}
        noResults={isEmpty(props.item)}
      >
        {props.children || <ChildrenDefault />}
      </TestHarness>
    </Suspense>
  </ErrorBoundary>
  );
}

export default Formhelper;
