package vegawebtests;

import org.openqa.selenium.support.PageFactory;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.lang.String;

import vegawebtests.pages.AdminPage;
import vegawebtests.util.AccountHelper;
import vegawebtests.util.User;

public class RoleSwitchTest extends TestNgTestBase{

    private AdminPage adminpanel;
    private AccountHelper accountHelper;
    private final String adminUsername = "admin@venus.com";
    private final String adminPass = "pass";
    private final String testUsername = "testuser@venus.com";
    private final String testPass = "pass";

    @BeforeClass
    public void classInit() {
        accountHelper = new AccountHelper(driver, baseUrl);
        adminpanel = PageFactory.initElements(driver, AdminPage.class);
    }

    @BeforeMethod
    public void testInit() {
    }

    @AfterMethod
    public void testCleanup() {
        accountHelper.logout();
    }

    @Test
    public void testSwitchAccountFromUserToStaff() {
        // Set testuser to staff
        accountHelper.login(adminUsername, adminPass);
        adminpanel.clickLink("Admin");
        User testuser = adminpanel.getUser(testUsername);
        testuser.changeRole("STAFF", driver);

        // Check role
        accountHelper.switchAccountTo(testUsername, testPass);
        Assert.assertEquals(accountHelper.getRole(), "ROLE_STAFF");
    }

    @Test(dependsOnMethods = "testSwitchAccountFromUserToStaff")
    public void testSwitchAccountFromStaffToUser() {
        // Set testuser to staff
        accountHelper.login(adminUsername, adminPass);
        adminpanel.clickLink("Admin");
        User testuser = adminpanel.getUser(testUsername);
        testuser.changeRole("USER", driver);

        // Check role
        accountHelper.switchAccountTo(testUsername, testPass);
        Assert.assertEquals(accountHelper.getRole(), "ROLE_USER");
    }
}
