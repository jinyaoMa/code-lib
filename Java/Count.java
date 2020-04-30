package Java;

/**
 * Count
 */
public class Count {

  public static int vowels(String s) {
    int count = 0;
    String ns = s.toUpperCase();
    for (int i = 0; i <= ns.length(); i++) {
      char c = ns.charAt(i);
      if (c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
        count += 1;
      }
    }
    return count;
  }
}