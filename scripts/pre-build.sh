echo "***********************************************************"
echo "*                        Pre-Build                        *"
echo "***********************************************************"
##################################################################
#                                                                #
#   Runs any pre-build steps, including installing dependencies. #
#                                                                #
#   Example                                                      #
#     yarn test sonar_host=https://sonar.nuskin.net              #
#     npm test sonar_host=https://sonar.nuskin.net               #
#                                                                #
##################################################################
echo "---------------------------------------"
echo "|Install Serverless Framework|"
echo "---------------------------------------"
npm install -g serverless
echo "--------------------------"
echo "|Install of sonar-scanner|"
echo "--------------------------"
npm install -g sonar-scanner
echo "------------------------------"
echo "|Install package dependencies|"
echo "------------------------------"
npm install