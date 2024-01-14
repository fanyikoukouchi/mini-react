
function createTextNode(text){
    return{
        type:"Text_Element",
        props:{
            nodeValue:text,
            children:[],
        },
    };
}

function createElement(type,props,...children){
    return{
        type,
        props:{
            ...props,
            children:children.map(children =>{
                return typeof children === "string" ? createTextNode(children) : children;
            }),
        }
    }
}

// create a render function
function render(element,container){
    const dom = 
        element.type === "Text_Element"
        ? document.createTextNode("")
        : document.createElement(element.type);

    // assign the props to the dom
    Object.keys(element.props).forEach((key)=>{
        if(key !== "children"){
            dom[key] = element.props[key];
        }
    })

    // render the children
    const childElements = element.props.children || [];
    
    childElements.forEach(childElements => render(childElements,dom));

    // add the children
    container.append(dom);

}


const React = {
    render,
    createElement,
};


export default React;