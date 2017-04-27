import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';

/*                        LANDING ROUTE                       */
export const landingPageRouteName = 'Landing_Page';
FlowRouter.route('/', {
  name: landingPageRouteName,
  action() {
    BlazeLayout.render('Landing_Page_Layout', { main: landingPageRouteName });
  },
});


/*                        USER ROUTES                      */
function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}
const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const profilePageRouteName = 'Edit_Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

export const homePageName = 'Home_Page';
userRoutes.route('/homepage', {
  name: homePageName,
  action() {
    BlazeLayout.render('User_Layout', { main: homePageName });
  },
});

FlowRouter.route('/list', {
  name: 'List_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
  },
});

FlowRouter.route('/add-request', {
  name: 'Add_Request',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Request' });
  },
});

FlowRouter.route('/stuff/:_id', {
  name: 'Edit_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
  },
});

FlowRouter.route('/edit-profile', {
  name: 'Edit_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile_Page' });
  },
});

FlowRouter.route('/profile-pool', {
  name: 'Profile_Pool_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Profile_Pool_Page' });
  },
});

FlowRouter.route('/request-pool', {
  name: 'Request_Pool_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Request_Pool_Page' });
  },
});

FlowRouter.route('/request-details', {
  name: 'Request_Details_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Request_Details_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
