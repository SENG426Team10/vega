package vegawebtests;

import org.openqa.selenium.support.PageFactory;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import vegawebtests.pages.ResourcesPage;
import vegawebtests.util.AccountHelper;
import vegawebtests.util.User;

public class ResourcesTest extends TestNgTestBase{

    private ResourcesPage resourcesPage;
    private AccountHelper accountHelper;
    private final String adminUsername = "admin@venus.com";
    private final String adminPass = "pass";
    private final String staffUsername = "jonoliver@venus.com";
    private final String staffPass = "pass";
    private final String testFile = "test.txt";
    
    @BeforeClass
    public void classInit() {
        accountHelper = new AccountHelper(driver, baseUrl);
        resourcesPage = PageFactory.initElements(driver, ResourcesPage.class);
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
    public void testFileUpload() {
        accountHelper.login(adminUsername, adminPass);

        resourcesPage.clickLink("Resources");

        resourcesPage.submitFile(String.format("src/test/resources/%s", testFile));

        Assert.assertNotNull(resourcesPage.getFileLinkByName(testFile));
    }

    @Test
    public void testStaffCanAccessResources() {
        accountHelper.login(staffUsername, staffPass);
        Assert.assertEquals(accountHelper.getRole(), "ROLE_STAFF");
        Assert.assertEquals(resourcesPage.allLinks.get(3).getText(), "Resources");
    }

    @Test
    public void testAdminCanAccessResources() {
        accountHelper.login(adminUsername, adminPass);
        Assert.assertEquals(accountHelper.getRole(), "ROLE_ADMIN");
        Assert.assertEquals(resourcesPage.allLinks.get(3).getText(), "Resources");
    }
}
