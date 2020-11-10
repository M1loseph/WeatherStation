#ifndef __DEBUG_HPP__
#define __DEBUG_HPP__

#if DEBUG

#define INIT_DEBUG Serial.begin(config::monitor_speed);
#define LOG(var) Serial.print(var);
#define LOG_NL(var) Serial.println(var);
#define LOG_F(...) Serial.printf(__VA_ARGS__);
#define SERIALIZE(json) serializeJsonPretty(json, Serial);

#else

#define INIT_DEBUG
#define LOG(var)
#define LOG_NL(var)
#define LOG_F(...)
#define SERIALIZE(json)

#endif // DEBUG

#endif // __DEBUG_HPP__
