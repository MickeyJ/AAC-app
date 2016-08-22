

export const handleRouteChange = (component, cb, error) =>{
  component.context.router.listenBefore((route) =>{

    if(component.state.errorMessage !== '') cb(error);

  })
};