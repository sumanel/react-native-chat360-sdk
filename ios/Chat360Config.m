//
//  Chat360Config.m
//  react-native-chat360-sdk
//
//  Created by Harshit Sharma on 21/12/24.
//
#import "Chat360Config.h"

@interface Chat360Config ()

@property (nonatomic, copy) NSString *stagingUrl;

- (nullable NSURL *)createBaseUrlWithMetaString:(nullable NSString *)metaString;

@end

@implementation Chat360Config

- (instancetype)initWithBotId:(NSString *)botId
                       appId:(NSString *)appId
                      isDebug:(BOOL)isDebug
                       flutter:(BOOL)flutter
                         meta:(nullable NSDictionary<NSString *, NSString *> *)meta
{
    self = [super init];
    if (self) {
        _baseUrl = @"https://app.chat360.io/page?h=";
        _stagingUrl = @"https://staging.chat360.io/page?h=";
        _botId = botId;
        _appId = @"";
        _isDebug = isDebug;
        _flutter = flutter;
        _meta = meta;
    }
    return self;
}

- (nullable NSURL *)createUrl {
    @try {
        // Check if meta is nil or empty
        if (self.meta == nil || self.meta.count == 0) {
            return [self createBaseUrlWithMetaString:nil];
        }
        
        NSError *error;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self.meta options:0 error:&error];
        if (error) {
            RCTLogInfo(@"Error: %@", error.localizedDescription);
            return nil;
        }
        
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        NSString *encodedString = [jsonString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
        
        return [self createBaseUrlWithMetaString:encodedString];
    }
    @catch (NSException *exception) {
        RCTLogInfo(@"Exception: %@", exception);
        return nil;
    }
}

- (nullable NSURL *)createBaseUrlWithMetaString:(nullable NSString *)metaString {
    NSString *base = self.isDebug ? self.stagingUrl : self.baseUrl;
    NSMutableString *urlString = [NSMutableString stringWithFormat:@"%@%@&store_session=1&app_id=%@&is_mobile=true&mobile=1", base, self.botId, @""];
    
    if (metaString) {
        [urlString appendFormat:@"&meta=%@", metaString];
    }
    
    if (self.flutter) {
        [urlString appendString:@"&flutter_sdk_type=ios"];
    }
    
    RCTLogInfo(@"Bot to Open: %@", urlString);
    
    return [NSURL URLWithString:urlString];
}

@end
