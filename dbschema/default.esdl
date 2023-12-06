using extension auth;

module default {
  global current_user := (
    assert_single((
      select User { id, name }
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );

  type User {
    required name: str;
    required identity: ext::auth::Identity;
  }
  
  scalar type LabelType extending enum<'Date', 'Years', 'Since', 'Version', 'Link', 'Country', 'WorkType', 'Role' >;
  scalar type ItemType extending enum<'Work', 'Position', 'Project', 'Skill', 'Root', 'Like', 'Default'>;
  scalar type ModeType extending enum<'dark', 'light'>;

  type Label {
    es: str;
    en: str;
    subvalue: str;
    type: LabelType;
    size: str;
    color: str;
    bottom: str;
  }

  type Icon {
    required key: str;
    size: str;
    top: str;
  };

  type Background {
    required src: str;
    height: str;
    x: str;
    y: str;
    full: bool;
  };
  
  type Glow {
    blur: int16;
    color: str;
  }

  type Color {
    primary: str;
    secondary: str;
    hover: str;
    multi glow: Glow;
  };

  type Description {
    es: str;
    en: str;
  }

  type Item {
    label: Label;
    multi sublabels: Label;
    exp: int16;
    type: ItemType;
    style: json;
    details: json;
    icon: Icon;
    description: Description;
    background: Background;
    colors: Color;
    mode: ModeType;
    action: bool;
  };

  type Node {
    required item: Item;
    required position: int16;
    style: json;
    multi children: Node;
  }
}