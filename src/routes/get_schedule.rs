use std::path::Path;

use afire;

use crate::event;

pub fn add_route(server: &mut afire::Server) {
    server.route(afire::Method::GET, "/schedule", |_req| {
        let events = event::load_events(Path::new("data/events.json"));

        let resp = events
            .iter()
            .map(|c| c.jsonify())
            .collect::<Vec<String>>()
            .join(",");

        afire::Response::new(
            200,
            &format!("[{}]", resp),
            vec![afire::Header::new("Content-Type", "application/json")],
        )
    })
}
