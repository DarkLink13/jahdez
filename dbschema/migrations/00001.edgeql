CREATE MIGRATION m13m7ubjek32nhdtj4vuankoml67m2qskkxzstdzhuy5jziuahyewa
    ONTO initial
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  CREATE TYPE default::User {
      CREATE REQUIRED LINK identity: ext::auth::Identity;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::User {
          id,
          name
      }
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
  CREATE TYPE default::Background {
      CREATE PROPERTY full: std::bool;
      CREATE PROPERTY height: std::str;
      CREATE REQUIRED PROPERTY src: std::str;
      CREATE PROPERTY x: std::str;
      CREATE PROPERTY y: std::str;
  };
  CREATE TYPE default::Glow {
      CREATE PROPERTY blur: std::int16;
      CREATE PROPERTY color: std::str;
  };
  CREATE TYPE default::Color {
      CREATE MULTI LINK glow: default::Glow;
      CREATE PROPERTY hover: std::str;
      CREATE PROPERTY primary: std::str;
      CREATE PROPERTY secondary: std::str;
  };
  CREATE TYPE default::Description {
      CREATE PROPERTY en: std::str;
      CREATE PROPERTY es: std::str;
  };
  CREATE TYPE default::Icon {
      CREATE REQUIRED PROPERTY key: std::str;
      CREATE PROPERTY size: std::str;
      CREATE PROPERTY top: std::str;
  };
  CREATE SCALAR TYPE default::LabelType EXTENDING enum<Date, Years, Since, Version, Link, Country, WorkType, Role>;
  CREATE TYPE default::Label {
      CREATE PROPERTY bottom: std::str;
      CREATE PROPERTY color: std::str;
      CREATE PROPERTY en: std::str;
      CREATE PROPERTY es: std::str;
      CREATE PROPERTY size: std::str;
      CREATE PROPERTY subvalue: std::str;
      CREATE PROPERTY type: default::LabelType;
  };
  CREATE SCALAR TYPE default::ItemType EXTENDING enum<Work, Position, Project, Skill, Root, `Like`, Default>;
  CREATE SCALAR TYPE default::ModeType EXTENDING enum<dark, light, es, en>;
  CREATE TYPE default::Item {
      CREATE LINK background: default::Background;
      CREATE LINK colors: default::Color;
      CREATE LINK description: default::Description;
      CREATE LINK icon: default::Icon;
      CREATE LINK label: default::Label;
      CREATE MULTI LINK sublabels: default::Label;
      CREATE PROPERTY action: std::bool;
      CREATE PROPERTY details: std::json;
      CREATE PROPERTY exp: std::int16;
      CREATE PROPERTY mode: default::ModeType;
      CREATE PROPERTY style: std::json;
      CREATE PROPERTY type: default::ItemType;
  };
  CREATE TYPE default::Node {
      CREATE REQUIRED LINK item: default::Item;
      CREATE MULTI LINK children: default::Node;
      CREATE LINK parent := (.<children[IS default::Node]);
      CREATE REQUIRED PROPERTY position: std::int16;
      CREATE PROPERTY style: std::json;
  };
};
