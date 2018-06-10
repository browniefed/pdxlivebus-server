exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("reports", table => {
      table.increments();
      table.enu("type", [
        "medical",
        "suspicious_package",
        "violence",
        "gang",
        "harassment",
        "assault",
        "vandalism",
        "other",
      ]);
      table.text("description");
      table.text("phone");
      table.text("coordinates");
      table.text("route_number");
      table.text("vehicle_number");
      table.text("stop_id");
      table.text("name");
      table.timestamps(true, true);
    })
    .createTable("assets", table => {
      table.increments();
      table.enu("type", ["image", "video"]);
      table.integer("report_id");
      table.text("url");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("reports").dropTable("assets");
};
