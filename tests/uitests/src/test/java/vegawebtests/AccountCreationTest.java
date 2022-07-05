package vegawebtests;

import org.openqa.selenium.By;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.lang.String;

import javax.xml.xpath.XPath;

import vegawebtests.pages.LoginPage;
import vegawebtests.pages.LogoutPage;
import vegawebtests.pages.AdminPage;
import vegawebtests.util.AccountHelper;
import vegawebtests.util.User;
import vegawebtests.TestNgTestBase;

public class AccountCreationTest extends TestNgTestBase {

  private LoginPage loginpage;
  private LogoutPage logoutpage;
  private AdminPage adminpanel;
  private AccountHelper accountHelper;
  private final String adminUsername = "admin@venus.com";
  private final String adminPass = "pass";
  private final String dummyUsername = "example@fake.com";
  private final String dummyPass = "pass";

  @BeforeClass
  public void classInit() {
    accountHelper = new AccountHelper(driver, baseUrl);
    loginpage = PageFactory.initElements(driver, LoginPage.class);
    logoutpage = PageFactory.initElements(driver, LogoutPage.class);
    adminpanel = PageFactory.initElements(driver, AdminPage.class);
  }

  @BeforeMethod
  public void testInit() {
    driver.get(String.format("%s/login", baseUrl));
  }

  @AfterMethod
  public void testCleanup() {
    accountHelper.logout();
  }

  @Test
  public void testValidAccountCreationSubmit() {
    loginpage.switchMode();

    loginpage.createAccount(dummyUsername, "First", "Last", dummyPass);
    
    new WebDriverWait(driver, 10).until(ExpectedConditions.textToBePresentInElement(loginpage.feedbackElement, "User Created Successfully"));

    Assert.assertEquals(loginpage.feedbackElement.getText(), "User Created Successfully");
  }

  @Test
  public void testInvalidAccountCreationSubmit() {
    loginpage.switchMode();

    loginpage.createAccount(adminUsername, "First", "Last", adminPass);

    new WebDriverWait(driver, 10).until(ExpectedConditions.textToBePresentInElement(loginpage.feedbackElement, "Username Already In Use"));

    Assert.assertEquals(loginpage.feedbackElement.getText(), "Username Already In Use");
  }

  @Test(dependsOnMethods = {"testValidAccountCreationSubmit"})
  public void testLoginToUnactivatedAccount() {
    loginpage.login(dummyUsername, dummyPass);
    
    new WebDriverWait(driver, 10).until(ExpectedConditions.textToBePresentInElement(loginpage.feedbackElement, "Invalid login, please try again."));

    Assert.assertEquals(loginpage.feedbackElement.getText(), "Invalid login, please try again.");
  }

  @Test(dependsOnMethods = {"testLoginToUnactivatedAccount"})
  public void testActivateAccount() {
    loginpage.login(adminUsername, adminPass);

    loginpage.clickLink("Admin"); 

    new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//table/tbody/tr[1]/td[4]/a"))));

    User dummy = adminpanel.getUser(dummyUsername);
    dummy.enableUser(driver);

    loginpage.clickLink("Logout"); 

    new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(logoutpage.signoutElement));
    logoutpage.signoutElement.click();

    loginpage.clickLink("Login/SignUp");

    loginpage.login(dummyUsername, dummyPass);

    Assert.assertEquals(accountHelper.getRole(), "ROLE_USER");
  }
}