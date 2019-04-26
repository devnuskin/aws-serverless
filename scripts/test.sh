echo "***********************************************************"
echo "*                      Testing                            *"
echo "***********************************************************"
##################################################################
#                                                                #
#   Runs any test and / or reports to vaidate code and build     #
#   quality.                                                     #
#                                                                #
#   Example                                                      #
#     yarn test sonar_host=https://sonar.nuskin.net              #
#     npm test sonar_host=https://sonar.nuskin.net               #
#                                                                #
##################################################################
for ARGUMENT in "$@"
do
    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)   
    case "$KEY" in
            sonar_host)    sonar_host=${VALUE} ;;     
            *)   
    esac    
done
echo "--------------------------------"
echo "|Starting Mocha/Instambul Tests|"
echo "--------------------------------"
nyc --reporter=html --reporter=text --check-coverage --lines 80 --functions 90 --branches 50 mocha --reporter=mochawesome --timeout 5000
echo "-----------------"
echo "|Report to Sonar|"
echo "-----------------"
sonar-scanner -Dsonar.host.url=$sonar_host
