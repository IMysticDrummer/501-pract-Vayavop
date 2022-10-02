# SPINNER

## *IMPORTANT*
Spinner use the pubSub module to recive the communications to hide/show and delete.
You can get the pubSub in the root direction of the VayaPop application.

## Use of spinner
### 1- Locating the class chapter
    a- Put the class carpet directly in your project main carpet.

### 2- HTML files  
    a- Add a css link in the html files you'll need the spinner.  
    b- Add a `<div>` or `<section>` to contain the spinner. For example:
    `<section class="spinnerContainer"></section>`
### 3- JavaScript
    a- Import the Spinner class. For example:
    `import { Spinner } from "../Spinner/Spinner.js";`
    b- Add a lines in your JavaScript controller, to get the spinner container and attach a new Spinner instance. For example:
      `const spinnerContainer=document.querySelector('.spinnerContainer');
      const spinnerController=new Spinner(spinnerContainer);`
      This will activate automatically the spiner in your container.
### 4- Hide / Show the spinner
    a- To change between hide an show the spinner, it's only necessary to publish (with pubSub) a SPINNER_HIDE_SHOW topic.
    This will change the spinner status.

### 5- Delete the spinner from the page
    a- You have to publish (with pubSub) a SPINNER_DELETE topic. The spinner declaration will be erased (not the container). The css link will not be remove.
    
