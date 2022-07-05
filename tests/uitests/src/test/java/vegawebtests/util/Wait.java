package vegawebtests.util;

public class Wait {
    public static void wait(int ms)
    {
        try {
            Thread.sleep(ms);
        } catch(InterruptedException ex){
            Thread.currentThread().interrupt();
        }
    }
}
