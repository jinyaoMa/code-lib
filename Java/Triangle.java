package Java;

public class Triangle {

  private int sideA, sideB, sideC;

  /**
   * Input 3 lines for triangle checking
   *
   * @param a first line
   * @param b second line
   * @param c third line
   */
  public Triangle(int a, int b, int c) {
    sideA = a;
    sideB = b;
    sideC = c;
  }

  /**
   *
   * @return first line
   */
  public int getA() {
    return sideA;
  }

  /**
   *
   * @return second line
   */
  public int getB() {
    return sideB;
  }

  /**
   *
   * @return third line
   */
  public int getC() {
    return sideC;
  }

  /**
   *
   * @return the shortest line of the 3 lines
   */
  private int shortestSide() {
    return Math.min(Math.min(sideA, sideB), sideC);
  }

  /**
   *
   * @return the longest line of the 3 lines
   */
  private int longestSide() {
    return Math.max(Math.max(sideA, sideB), sideC);
  }

  /**
   *
   * @return the medium line of the 3 lines
   */
  private int mediumSide() {
    return (sideA + sideB + sideC) - shortestSide() - longestSide();
  }

  /**
   *
   * "2 shortest lines (summed) must be longer than the longest line" in order to
   * form a triangle. a < (b + c) , a - the longest line
   * 
   * @return true/false if the 3 lines can form a triangle
   */
  public boolean isTriangle() {
    return longestSide() < (shortestSide() + mediumSide());
  }

  /**
   *
   * The square of the longest line must equal to the sum of the square of the
   * medium line and the square of the shortest line, in order to form a
   * right-angle triangle. a**2 = b**2 + c**2 (a is the longest line)
   * 
   * @return true/false if the 3 lines can form a right-angle triangle
   */
  public boolean isRight() {
    return longestSide() * longestSide() == shortestSide() * shortestSide() + mediumSide() * mediumSide();
  }
}