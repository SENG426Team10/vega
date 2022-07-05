package vegawebtests;
import java.util.concurrent.TimeUnit;
import java.io.*;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.AfterSuite;

//import ru.stqa.selenium.factory.WebDriverFactory;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

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

    //Capabilities capabilities = PropertyLoader.loadCapabilities();

    //driver = WebDriverFactory.getDriver(baseUrl);
    ChromeOptions options = new ChromeOptions();
    options.addArguments("--start-maximized");
    System.setProperty("webdriver.chrome.driver", "C:\\webdrivers\\chromedriver.exe");
    driver = new ChromeDriver(options);

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
