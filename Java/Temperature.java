package Java;

public class Temperature {

  public class Unit {
    public static final String Kelvin = " K";
    public static final String Celsius = "°C";
    public static final String Fahrenheit = "°F";
    public static final String Rankine = "°Ra";
    public static final String Reaumur = "°R";
  }

  public class Value {
    private double value;
    private String unit = "";

    public Value(double value) {
      setValue(value);
    }

    public double getValue() {
      return value;
    }

    public void setValue(double value) {
      this.value = value;
    }

    public String getUnit() {
      return unit;
    }

    public void setUnit(String unit) {
      this.unit = unit;
    }

    @Override
    public String toString() {
      return String.format("%.2f%s", value, unit);
    }
  }

  public class Kelvin extends Value {
    public Kelvin(double value) {
      super(value);
      setUnit(Unit.Kelvin);
    }

    public Celsius toCelsius() {
      return new Celsius(getValue() - 273.15d); // C = K - 273.15
    }

    public Fahrenheit toFahrenheit() {
      return new Fahrenheit(getValue() * 1.8d - 459.67d); // F = K * 1.8 - 459.67
    }

    public Rankine toRankine() {
      return new Rankine(getValue() * 1.8d); // Ra = K * 1.8
    }

    public Reaumur toReaumur() {
      return new Reaumur((getValue() - 273.15d) * 0.8d); // R = (K - 273.15) * 0.8
    }
  }

  public class Celsius extends Value {
    public Celsius(double value) {
      super(value);
      setUnit(Unit.Celsius);
    }

    public Kelvin toKelvin() {
      return new Kelvin(getValue() + 273.15d); // K = C + 273.15
    }

    public Fahrenheit toFahrenheit() {
      return new Fahrenheit(getValue() + 273.15d); // K = C + 273.15
    }

    public Rankine toRankine() {
      return new Rankine(getValue() * 1.8d + 32d + 459.67d); // Ra = C * 1.8 + 32 + 459.67
    }

    public Reaumur toReaumur() {
      return new Reaumur(getValue() * 0.8d); // R = C * 0.8
    }
  }

  public class Fahrenheit extends Value {
    public Fahrenheit(double value) {
      super(value);
      setUnit(Unit.Fahrenheit);
    }

    public Kelvin toKelvin() {
      return new Kelvin((getValue() + 459.67d) / 1.8d); // K = (F + 459.67) / 1.8
    }

    public Celsius toCelsius() {
      return new Celsius((getValue() - 32d) / 1.8d); // C = (F - 32) / 1.8
    }

    public Rankine toRankine() {
      return new Rankine(getValue() + 459.67d); // Ra = F + 459.67
    }

    public Reaumur toReaumur() {
      return new Reaumur((getValue() - 32d) / 2.25d); // R = (F - 32) / 2.25
    }
  }

  public class Rankine extends Value {
    public Rankine(double value) {
      super(value);
      setUnit(Unit.Rankine);
    }

    public Kelvin toKelvin() {
      return new Kelvin(getValue() * 1.8d); // K = Ra * 1.8
    }

    public Celsius toCelsius() {
      return new Celsius((getValue() - 32d - 459.67d) / 1.8d); // C = (Ra - 32 - 459.67) / 1.8
    }

    public Fahrenheit toFahrenheit() {
      return new Fahrenheit(getValue() - 459.67d); // F = Ra - 459.67
    }

    public Reaumur toReaumur() {
      return new Reaumur((getValue() - 459.67d - 32d) / 2.25d); // R = (Ra - 459.67 - 32) / 2.25
    }
  }

  public class Reaumur extends Value {
    public Reaumur(double value) {
      super(value);
      setUnit(Unit.Reaumur);
    }

    public Kelvin toKelvin() {
      return new Kelvin(getValue() * 1.25d + 273.15d); // K = R * 1.25 + 273.15
    }

    public Celsius toCelsius() {
      return new Celsius(getValue() * 1.25d); // C = R * 1.25
    }

    public Fahrenheit toFahrenheit() {
      return new Fahrenheit(getValue() * 2.25d + 32d); // F = R * 2.25 + 32
    }

    public Rankine toRankine() {
      return new Rankine(getValue() * 2.25d + 32d + 459.67d); // Ra = R * 2.25 + 32 + 459.67
    }
  }
}