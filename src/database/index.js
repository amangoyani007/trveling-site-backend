// database related modules
module.exports = {

  databaseConnection: require('./connection'),

  EmailRepository: require('./repository/email-repository'),
  TourRepository: require('./repository/tour-repository'),

}