use crate::ACTIVE;

pub fn add_route(server: &mut afire::Server) {
    server.route(afire::Method::POST, "/api/admin", |req| {
        let body_data = afire::Query::from_body(req.body);
        let new_id = match body_data.get("id") {
            Some(i) => i,
            None => {
                return afire::Response::new(
                    400,
                    "No Id",
                    vec![afire::Header::new("Content-Type", "text/plain")],
                );
            }
        };

        let id = match new_id.parse::<u32>() {
            Ok(i) => i,
            Err(_) => {
                return afire::Response::new(
                    400,
                    "Invalid
                     Id",
                    vec![afire::Header::new("Content-Type", "text/plain")],
                );
            }
        };

        unsafe {
            ACTIVE = id;
        }

        afire::Response::new(
            200,
            &format!("Ok! [{}]", id),
            vec![afire::Header::new("Content-Type", "text/plain")],
        )
    })
}
