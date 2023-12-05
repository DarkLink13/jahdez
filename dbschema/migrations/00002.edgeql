CREATE MIGRATION m14uxbehymbmu3cdgsu4lzajrw676ifmfc35myhnnc5dntsb4i7oaq
    ONTO m172o2vchxyth6jvm36b7x3gevwhhvdc2vvnzgueju7lmgr5wfvmca
{
  CREATE TYPE default::Description {
      CREATE PROPERTY en: std::str;
      CREATE PROPERTY es: std::str;
  };
  ALTER TYPE default::Item {
      DROP PROPERTY description;
  };
  ALTER TYPE default::Item {
      CREATE LINK description: default::Description;
      DROP PROPERTY key;
  };
  ALTER TYPE default::Label {
      CREATE PROPERTY es: std::str;
  };
  ALTER TYPE default::Label {
      ALTER PROPERTY value {
          RENAME TO en;
      };
  };
};
