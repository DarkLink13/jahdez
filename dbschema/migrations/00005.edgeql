CREATE MIGRATION m12d4ihqpdjmzs7eeqg7gmipc7fvcr54bbo226ypfqhucrfqhzfbfq
    ONTO m1lv3f7uoifvbzy5vtjt6exxojkexz3ekimoyfljlo3ckgfit4x2tq
{
  ALTER TYPE default::Node {
      CREATE LINK parent := (.<children[IS default::Node]);
  };
};
