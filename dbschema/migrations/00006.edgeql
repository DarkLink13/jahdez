CREATE MIGRATION m1i4udnkuabx3jqz2wrmh5qt6dz543mmisrftc3zjzyvuojmpgyzca
    ONTO m12d4ihqpdjmzs7eeqg7gmipc7fvcr54bbo226ypfqhucrfqhzfbfq
{
  ALTER SCALAR TYPE default::ModeType EXTENDING enum<dark, light, es, en>;
};
