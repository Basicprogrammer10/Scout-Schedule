use std::path::Path;

use crate::event;
use crate::ACTIVE;

pub fn add_route(server: &mut afire::Server) {
    server.route(afire::Method::GET, "/api/schedule", |_req| {
        let events = event::load_events(Path::new("data/events.json"));

        let resp = events
            .iter()
            .map(|c| c.jsonify())
            .collect::<Vec<String>>()
            .join(",");

        afire::Response::new(
            200,
            &format!(r#"{{"id":{},"data":[{}]}}"#, unsafe { ACTIVE }, resp),
            vec![afire::Header::new("Content-Type", "application/json")],
        )
    })
}
