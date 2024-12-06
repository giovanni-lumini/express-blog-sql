const logger_middleware = (req, res, next) => {
    const now = new Date();
    //logga nel terminale data, metodo e url
    console.error(`
      Date: ${now} 
      Method: ${req.method} 
      URL: ${req.baseUrl}`);
  
    // we need to call next to avoid the request is hanging forever.
    next();
}

module.exports = logger_middleware;