echo "***********************************************************"
echo "*                          Deploy                         *"
echo "***********************************************************"
##################################################################
#                                                                #
#   Deploys the code using the Serverless Framework.             #
#                                                                #
#   Example                                                      #
#     yarn deploy stage=dev region=us-west-2                     #
#     npm deploy stage=dev region=us-west-2                      #
#                                                                #
##################################################################
for ARGUMENT in "$@"
do
    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)   
    case "$KEY" in
            stage)              stage=${VALUE} ;;
            region)              region=${VALUE} ;;
            *)   
    esac    
done
echo "--------------------------------------"
echo "|Starting Serverless Framework Deploy|"
echo "--------------------------------------"
sls deploy --verbose --stage $stage --region $region