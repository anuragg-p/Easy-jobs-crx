# EasyJob ChromeExtension





# Backend URL Endpoints Structure

## Root
- **`admin/`** - Django Admin Site
- **`/`** - Homepage (includes `homepage.urls`)

## API

### User-related Endpoints (includes `user.urls`)
- **`api/user/`**
  - **`register/`**
    - *Description*: Register a new user
    - *View*: `RegisterView`
  - **`login/`**
    - *Description*: Obtain JWT token
    - *View*: `MyTokenObtainPairView`
  - **`token/refresh/`**
    - *Description*: Refresh JWT token
    - *View*: `MyTokenRefreshView`
  - **`me/`**
    - *Description*: Get details of the authenticated user
    - *View*: `UserDetailView`

### Job-related Endpoints (includes `saved_job.urls`)
- **`api/jobs/`**
  - **`jobs/`**
    - *Description*: List all jobs and create a new job
    - *View*: `JobListCreateView`
  - **`jobs/<int:pk>/`**
    - *Description*: Retrieve, update, or delete a job by its ID
    - *View*: `JobDetailView`

---

# Feature List 
### For Job Seeker :
> 1. User will login save job to their profile by scraping from - LinkedIn, Naukri , Indeed , GlassDoor etc
> 2. Each Job will be Analyzed using a NER-detector to extract keyword of techstack/frameworks/job-requirements etc from the JD (job-description)
> 3. User can upload their Resume and the skills listed in their resume will be compared against the skills in JD to give a percentage chance of being shortlisted via resume.
> 4. A To-Learn list will be made - for different job type , and the progress can be tracked.A roadmap can be provided of from the ROADMAP.sh.
> 5. Udemy : Courses and Pupular courses and Articles will be recommended to assist student understanding on a topic (listed in JD) in short Duration.

### For Recruiter :
  
