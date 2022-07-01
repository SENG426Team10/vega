package vegawebtests;

import org.openqa.selenium.support.PageFactory;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import java.lang.String;

import javax.xml.xpath.XPath;

import vegawebtests.pages.HomePage;

public class SampleTestNgTest extends TestNgTestBase {

  private HomePage homepage;

  @BeforeClass
  public void testInit() {
    //driver.get(baseUrl);

    driver.navigate().to("http://localhost:3000");
    homepage = PageFactory.initElements(driver, HomePage.class);
  }

  @Test
  public void testNavBarHasAllLinks() {

    Assert.assertTrue("Platform".equals(homepage.allLinks.get(0).getText()));

    Assert.assertTrue("News & Events".equals(homepage.allLinks.get(1).getText()));

    Assert.assertTrue("Leadership".equals(homepage.allLinks.get(2).getText()));

    Assert.assertTrue("About us".equals(homepage.allLinks.get(3).getText()));

    Assert.assertTrue("Contact us".equals(homepage.allLinks.get(4).getText()));
    
  }
}
