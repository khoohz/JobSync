import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Dashboard",
    "Applications",
    "Task Lists",
    "Companies",
    "Contacts",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    ////////////////////////////////////
    getApplications: build.query({
      query: () => "applications",
      providesTags: ["Applications"],
    }),
    getApplication: build.query({
      query: (id) => `applications/${id}`,
      providesTags: ["Applications"],
    }),
    createApplication: build.mutation({
      query: (body) => ({
        url: "applications/post",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Applications"],
    }),
    deleteApplication: build.mutation({
      query: (body) => ({
        url: "applications/delete",
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Applications"],
    }),
    updateApplication: build.mutation({
      query: (body) => ({
        url: `applications/update/${body.appId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Applications"],
    }),
    /////////////////////////////////
    getTaskStatus: build.query({
      query: () => "tasks",
      providesTags: ["Tasks"],
    }),
    createTask: build.mutation({
      query: (body) => ({
        url: "tasks/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskPosition: build.mutation({
      query: (body) => ({
        url: "tasks/update-position",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: build.mutation({
      query: ({ taskId, title, company, deadline, content }) => ({
        url: `tasks/${taskId}`,
        method: "PUT",
        body: { title, company, deadline, content },
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `tasks/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    ////////////////////////////////////
    getContacts: build.query({
      query: () => "contacts",
      providesTags: ["Contacts"],
    }),
    getContact: build.query({
      query: (id) => `contacts/${id}`,
      providesTags: ["Contacts"],
    }),
    createContact: build.mutation({
      query: (body) => ({
        url: "contacts/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Contacts"],
    }),
    updateContact: build.mutation({
      query: ({
        name,
        email,
        phoneNumber,
        position,
        department,
        company,
        location,
        linkedInURL,
        otherURL,
        userId,
        contactId,
      }) => ({
        url: `contacts/update/${contactId}`,
        method: "PUT",
        body: {
          name,
          email,
          phoneNumber,
          position,
          department,
          company,
          location,
          linkedInURL,
          otherURL,
          userId,
        },
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: build.mutation({
      query: (id) => ({
        url: `contacts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
    ////////////////////////////////////
    getCompanies: build.query({
      query: () => "companies",
      providesTags: ["Companies"],
    }),
    getCompany: build.query({
      query: (id) => `companies/${id}`,
      providesTags: ["Companies"],
    }),
    createCompany: build.mutation({
      query: (body) => ({
        url: "companies/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Companies"],
    }),
    updateCompany: build.mutation({
      query: ({
        name,
        position,
        companySize,
        location,
        websiteURL,
        linkedInURL,
        rating,
        userId,
        companyId,
      }) => ({
        url: `companies/update/${companyId}`,
        method: "PUT",
        body: {
          name,
        position,
        companySize,
        location,
        websiteURL,
        linkedInURL,
        rating,
        userId,
        },
      }),
      invalidatesTags: ["Companies"],
    }),
    deleteCompany: build.mutation({
      query: (id) => ({
        url: `companies/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Companies"],
    }),
    ////////////////////////////////
    getDashboardApps: build.query({
      query: () => "general/dashboard/applications",
      providesTags: ["Dashboard"],
    }),
    ///////////////////////////////
  }),
});

export const {
  useGetUserQuery,
  useGetApplicationsQuery,
  useGetApplicationQuery,
  useGetTaskStatusQuery,
  useGetCompaniesQuery,
  useGetContactsQuery,
  useGetContactQuery,
  useGetDashboardAppsQuery,

  useCreateApplicationMutation,
  useDeleteApplicationMutation,
  useUpdateApplicationMutation,

  useCreateTaskMutation,
  useUpdateTaskPositionMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,

  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,

  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = api;
