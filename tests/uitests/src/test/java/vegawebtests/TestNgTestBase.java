package vegawebtests;
import java.util.concurrent.TimeUnit;
import java.io.*;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.AfterSuite;

//import ru.stqa.selenium.factory.WebDriverFactory;
import org.openqa.selenium.chrome.ChromeDriver;

import vegawebtests.util.PropertyLoader;

/**
 * Base class for all the TestNG-based test classes
 */
public class TestNgTestBase {

  protected WebDriver driver;
  protected String gridHubUrl;
  protected String baseUrl;

  @BeforeSuite
  public void init() throws IOException {
    baseUrl = PropertyLoader.loadProperty("site.url");
    gridHubUrl = PropertyLoader.loadProperty("grid2.hub");

    //Capabilities capabilities = PropertyLoader.loadCapabilities();

    //driver = WebDriverFactory.getDriver(baseUrl);
    System.setProperty("webdriver.chrome.driver", "C:\\webdrivers\\chromedriver.exe");
    driver = new ChromeDriver();

    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @AfterSuite(alwaysRun = true)
  public void tearDown() {
    if(driver!=null){
      driver.close();
      driver.quit();
    }
  }
}
