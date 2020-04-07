export const environment = {
  production: true,
  baseurl : 'https://app.cognativeinsights.io/coreapi/',
  baseurl2 : 'https://app.cognativeinsights.io/transactionreportingapi/',
  bureaUrl : 'https://app.cognativeinsights.io/bureal/',
  baseurl3 : 'https://app.cognativeinsights.io/riskdashboardv1/',
  baseurl4 : 'https://app.cognativeinsights.io/burealdashboard/',
  socketUrl : 'https://app.cognativeinsights.io?token=' + `${localStorage.getItem('_cu')}`,
  // socketUrl : `https://testapp.cognativeinsights.io`,
  interval : 30000
};
