/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
const applicationModule = require("tns-core-modules/application");

const SecondViewModel = require("./second-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    if(!page.bindingContext) {
      page.bindingContext = new SecondViewModel();
    }
}

exports.onNavigatingTo = onNavigatingTo;

