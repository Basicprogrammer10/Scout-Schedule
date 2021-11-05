use std::path::Path;

use afire::Header;
use afire::Method;
use afire::Response;
use afire::Server;

use crate::event;
use crate::ACTIVE;

pub fn add_route(server: &mut Server) {
    server.route(Method::GET, "/api/schedule", |_req| {
        let events = event::load_events(Path::new("data/events.json"));

        let resp = events
            .iter()
            .map(|c| c.jsonify())
            .collect::<Vec<String>>()
            .join(",");

        Response::new()
            .text(format!(
                r#"{{"id":{},"data":[{}]}}"#,
                unsafe { ACTIVE },
                resp
            ))
            .header(Header::new("Content-Type", "application/json"))
    })
}
