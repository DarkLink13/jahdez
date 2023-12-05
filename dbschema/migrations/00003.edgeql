CREATE MIGRATION m1sajmvanqychzaxdeg6np5g5pvplk5bhuh7inrhe3imtbequurphq
    ONTO m14uxbehymbmu3cdgsu4lzajrw676ifmfc35myhnnc5dntsb4i7oaq
{
  ALTER SCALAR TYPE default::LabelType EXTENDING enum<Date, Years, Since, Version, Link, Country, WorkType, Role>;
};
