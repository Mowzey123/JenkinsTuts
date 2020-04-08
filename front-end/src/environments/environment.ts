export const environment = {
    production: false,
    baseurl : 'http://178.128.203.102:800/authservice/',
    baseurl2 : 'https://testapp.cognativeinsights.io/transactionreportingapi/',
    baseurl3 : 'https://testapp.cognativeinsights.io/riskdashboardv1/',
    baseurl4 : 'https://testapp.cognativeinsights.io/burealdashboard/',
    bureaUrl : 'https://testapp.cognativeinsights.io/bureal/',
    // socketUrl : 'https://testapp.cognativeinsights.io?token=`,
    SOCKET_ENDPOINT: 'https://testapp.cognativeinsights.io',
    socketUrl : 'https://testapp.cognativeinsights.io?token=' + `${localStorage.getItem('_cu')}`,
    // socketUrl : `https://testapp.cognativeinsights.io`,
    interval: 30000
  };



