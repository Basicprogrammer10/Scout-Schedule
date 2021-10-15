use afire;

use crate::ACTIVE;

pub fn add_route(server: &mut afire::Server) {
    server.route(afire::Method::GET, "/api/active", |_req| {
        afire::Response::new(
            200,
            &format!(r#"{{"active": {}}}"#, unsafe { ACTIVE }),
            vec![afire::Header::new("Content-Type", "application/json")],
        )
    })
}
