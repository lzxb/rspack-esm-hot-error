import * as Vue from './dist/vue.mjs';
import * as MyVue from './dist/myVue.mjs';
import * as HelloWorld from './dist/HelloWorld.mjs';

try {
  console.log('=== Vue Module Loading Test ===');
  console.log('Vue exports:', Object.keys(Vue));
  console.log('MyVue exports:', Object.keys(MyVue));
  console.log('HelloWorld exports:', Object.keys(HelloWorld));
  
  const isVueEqual = Vue.defineAsyncComponent === MyVue.defineAsyncComponent;
  console.log('Vue and MyVue defineAsyncComponent are equal:', isVueEqual);
  
  if (HelloWorld.default) {
    console.log('HelloWorld component loaded successfully:', HelloWorld.default.name || 'unnamed');
  } else {
    console.log('HelloWorld component structure:', HelloWorld);
  }
  
  console.log('=== Test completed successfully ===');
} catch (error) {
  console.error('Error during test execution:', error);
  process.exit(1);
}
