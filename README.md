# Vedant-Marine
Vedant Container Lines (India) Pvt. Ltd. is an extension of Vedant Clearing Pvt. Ltd., a two-decade-old logistics group delivering comprehensive NVOCC and international freight forwarding.

## Quote form email setup

The quote form sends enquiries through EmailJS. Vite loads these settings from
`.env` when the app is built:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Use the values from your EmailJS account (the local `.env.example` is a
reference). For a deployed site, add the same variables to the hosting
provider's build environment and rebuild/redeploy; setting them after the
build will not update the deployed bundle. Make sure the EmailJS template
uses the parameters `name`, `company`, `email`, `phone`, `service`, `origin`,
`destination`, `details`, and `reply_to`, and that its recipient is configured
to the inbox that should receive enquiries.
