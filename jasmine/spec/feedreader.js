/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('Feeds are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /*
     * Test if allFeeds.url have been set and a string containg 'http' exists.
     */
     it('URLs are defined and values are not falsy', function() {
       allFeeds.forEach(function(item) {
         expect(item.url).toBeDefined();
         expect(item.url).toBeTruthy();
         expect(item.url).toMatch(/http/);
       });
     });

    /*
     * Test if allFeeds.name have been set and the value if of type string.
     */
     it('Names are defined and values are not falsy', function() {
       allFeeds.forEach(function(item) {
         expect(item.name).toBeDefined();
         expect(item.name).toBeTruthy();
         expect(typeof item.name).toBe("string");
       });
     });
   });

  /* Test suit for the menu. */
  describe('The menu', function() {
    /*
     * Test if the menu is hidden by checking for 'menu-hidden' CSS class at
     * the body element.
     */
    it('Menu is hidden by default', function() {
     expect(document.body.classList).toContain("menu-hidden");
    });

   /*
    * Test for the menu button if the menu toggle between visible and invisible.
    */
    it('Menu toggle works', function() {
      var getMenuIcon = document.querySelector(".menu-icon-link");
      getMenuIcon.click();
      expect(document.body.classList).not.toContain("menu-hidden");
      getMenuIcon.click();
      expect(document.body.classList).toContain("menu-hidden");
    });
  });

  /* Create a test suit to check Feed Entries. */
  describe('Initial Entries', function() {
    /*
     * Load the Feed and check if we got at least one entrie by checking the
     * length of feed array.
     */
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it("At least one entry in the feed", function() {
      expect(document.querySelector(".feed").getElementsByClassName("entry").length).toBeGreaterThan(0);
    });
  });

  /* Create a test suit check the Feed Loading. */
  describe('New Feed Selection', function() {
    /*
     * Load the feed, store it, then test it agaist a new loadFeed.
     */
     beforeEach(function(done) {
       loadFeed(0, function() {
         /*
          * Get the feed now and check changes later.
          */
         initialFeed = document.querySelector(".feed").innerHTML;
         loadFeed(1, function() {
           done();
         });
       });
     });

     it("New feed load actually changes the contents", function() {
       expect(initialFeed).not.toBe(document.querySelector(".feed").innerHTML);
     });
  });
}());
