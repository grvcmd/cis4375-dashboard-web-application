import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // View to create a company
      path: '/companysignup',
      name: 'companysignup',
      component: () => import('../views/CreateCompanyView.vue')
    },
    {
      // View that displays all companies
      path: '/companies',
      name: 'view-companies',
      component: () => import('../views/CompanyView.vue')
    },
    {
      // View that displays all stakeholders
      path: '/stakeholders',
      name: 'view-all-stakeholders',
      component: () => import('../views/AllStakeholdersView.vue')
    },
    {
      // View that displays all licenses
      path: '/licenses',
      name: 'view-all-licenses',
      component: () => import('../views/AllLicensesView.vue') 
    },
    {
      // View to edit a company
      path: '/companies/edit/:c_id',
      name: 'edit-company',
      component: () => import('../components/EditCompanyComponent.vue')
    },
    {
      // View that displays all stakeholders of a company
      path: '/company-stakeholders/:c_id',
      name: 'view-stakeholders',
      component: () => import('../views/StakeholderView.vue'),
      prop: true
    },
    {
      // View to create a location for a certain c_id
      path: '/locationsignup/:c_id',
      name: 'locationsignup',
      component: () => import('../views/CreateLocationView.vue')
    },
    {
      // View that displays all locations of a company
      path: '/company-locations/:c_id',
      name: 'view-locations',
      component: () => import('../components/LocationsTable.vue')
    },
    {
      // View that displays all licenses of a location
      path: '/location-licenses/:loc_id',
      name: 'view-licenses',
      component: () => import('../components/LicensesTable.vue')
    },
    {
      // View to create a company_license under a certain loc_id
      path: '/companylicensesignup/:loc_id',
      name: 'companylicensesignup',
      component: () => import('../views/CreateCompanyLicenseView.vue')
    },
    {
      // View to edit a company_license
      path: '/location-licenses/edit/:l_id',
      name: 'edit-location-license',
      component: () => import('../components/EditCompanyLicenseComponent.vue')
    },
    {
      // View to edit a location
      path: '/company-locations/edit/:loc_id',
      name: 'edit-location',
      component: () => import('../components/EditLocationComponent.vue')
    },
    {
      // View that gets lease information of a location
      path: '/company-locations/lease/:loc_id',
      name: 'view-locations-leaseinfo',
      component: () => import('../components/LeaseInformationTable.vue')
    },
    {
      // View that gets more details of a stakeholder
      path: '/company-stakeholders/stakeholder/:s_id',
      name: 'view-stakeholders-moredetails',
      component: () => import('../components/StakeholderDetailsTable.vue')
    },
    {
      // View to edit a stakeholder
      path: '/company-stakeholders/edit/:s_id',
      name: 'edit-stakeholder',
      component: () => import('../components/EditStakeholderComponent.vue')
    },
    {
      // View to create a stakeholder under a certain c_id
      path: '/stakeholdersignup/:c_id',
      name: 'stakeholdersignup',
      component: () => import('../views/CreateStakeholderView.vue'),
      prop: true
    },
  ]
})


export default router
