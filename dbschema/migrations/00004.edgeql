CREATE MIGRATION m1lv3f7uoifvbzy5vtjt6exxojkexz3ekimoyfljlo3ckgfit4x2tq
    ONTO m1sajmvanqychzaxdeg6np5g5pvplk5bhuh7inrhe3imtbequurphq
{
  ALTER TYPE default::Node {
      ALTER PROPERTY position {
          SET REQUIRED USING (<std::int16>0);
      };
  };
};
