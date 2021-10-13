use std::fs;
use std::path::Path;

use serde_json::Value;

pub struct Event {
    name: String,
    time: u64,
}

impl Event {
    pub fn new(name: &str, time: u64) -> Event {
        Event {
            name: name.to_string(),
            time,
        }
    }

    pub fn jsonify(&self) -> String {
        format!(r#"{{"name":"{}","time":{}}}"#, self.name, self.time)
    }
}

/// Load events from a file to a Vector
pub fn load_events(path: &Path) -> Vec<Event> {
    let raw_data = fs::read_to_string(path).unwrap();

    let data: Value = serde_json::from_str(&raw_data).unwrap();

    let mut events = Vec::new();
    for event in data.as_array().unwrap() {
        events.push(Event::new(
            event["name"].as_str().unwrap(),
            event["time"].as_u64().unwrap(),
        ))
    }

    events
}
