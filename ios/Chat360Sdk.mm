#import "Chat360Sdk.h"

@implementation Chat360Sdk
RCT_EXPORT_MODULE()

- (void)startChatbot:(BOOL)animated config:(JS::NativeChat360Sdk::SpecStartChatbotConfig &)config {
    @try {
        dispatch_async(dispatch_get_main_queue(), ^{
            // Start the chatbot with animation control
            NSError *error = nil;
            
            if (!config.botId()) {
                RCTLogInfo(@"Error: Missing botId or appId");
                return;
            }
            
            // Create the Chat360Config object with the given configuration
            Chat360Config *chatConfig = [[Chat360Config alloc] initWithBotId:config.botId() appId:config.appId() isDebug:false flutter:false meta:nil];
            
            Chat360Bot *bot = [Chat360Bot alloc];
            [bot startChatbotWithAnimated:animated  config:chatConfig completion:^{
                RCTLogInfo(@"Chatbot started successfully.");
            } error:&error];
            
            // Handle any errors that occurred during startup
            if (error) {
                RCTLogInfo(@"Failed to start chatbot: %@", error.localizedDescription);
            }
        });
        } @catch (NSException *exception) {
            RCTLogInfo(@"Error starting chatbot: %@", exception.reason);
        }
    
}


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeChat360SdkSpecJSI>(params);
}



@end
