#import "Chat360Sdk.h"

@implementation Chat360Sdk
RCT_EXPORT_MODULE()

- (void)startChatbot:(JS::NativeChat360Sdk::SpecStartChatbotConfig &)config {
    @try {
        dispatch_async(dispatch_get_main_queue(), ^{
            // Start the chatbot with animation control
            NSError *error = nil;
            
            if (!config.botId()) {
                RCTLogInfo(@"Error: Missing botId or appId");
                return;
            }
            
            NSString* appId = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleIdentifier"];
            
            NSDictionary<NSString *, NSString *> *meta = convertJSONStringToDictionary(config.metadata());

            // Create the Chat360Config object with the given configuration
            Chat360Config *chatConfig = [[Chat360Config alloc] initWithBotId:config.botId() appId:appId isDebug:false flutter:false meta:meta];
            
            Chat360Bot *bot = [Chat360Bot alloc];
            [bot startChatbotWithAnimated:true  config:chatConfig completion:^{
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

NSDictionary<NSString *, NSString *> *convertJSONStringToDictionary(NSString *jsonString) {
    // Convert the JSON string to NSData
    NSData *data = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    
    NSError *error = nil;
    
    // Parse the JSON into an NSDictionary
    NSDictionary<NSString *, NSString *> *result = [NSJSONSerialization JSONObjectWithData:data
                                                                                    options:0
                                                                                     error:&error];
    if (error) {
        NSLog(@"Error parsing JSON: %@", error);
        return nil;
    }
    
    if (![result isKindOfClass:[NSDictionary class]]) {
        NSLog(@"Parsed result is not a dictionary");
        return nil;
    }
    NSMutableDictionary<NSString *, NSString *> *typedResult = [NSMutableDictionary dictionary];
    
    for (id key in result) {
        if ([key isKindOfClass:[NSString class]] && [result[key] isKindOfClass:[NSString class]]) {
            typedResult[key] = result[key];
        }
    }
    return [typedResult copy];
}


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeChat360SdkSpecJSI>(params);
}



@end
