import { PostConfirmationTriggerEvent, PostConfirmationTriggerHandler } from 'aws-lambda';

/**
 * Cognito Post-Confirmation Trigger Handler (`auth-fn`)
 * 
 * Triggered automatically by AWS Cognito after a user completes registration and confirms their email.
 * Extracts user attributes (`sub`, `email`, `name`, `custom:role`, `custom:faculty`) and logs them
 * in preparation for syncing with the RDS MySQL `users` table in Module 2.1.
 */
export const handler: PostConfirmationTriggerHandler = async (event: PostConfirmationTriggerEvent) => {
  console.log('Received Cognito PostConfirmation event:', JSON.stringify(event, null, 2));

  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    const { userAttributes } = event.request;
    
    const sub = userAttributes.sub;
    const email = userAttributes.email;
    const name = userAttributes.name || userAttributes['custom:fullname'] || email.split('@')[0];
    const role = userAttributes['custom:role'] || 'student';
    const faculty = userAttributes['custom:faculty'] || 'General Campus';

    console.log(`[AuthBootstrap] Confirmed new user registration:`);
    console.log(`  - Sub: ${sub}`);
    console.log(`  - Email: ${email}`);
    console.log(`  - Name: ${name}`);
    console.log(`  - Role: ${role}`);
    console.log(`  - Faculty: ${faculty}`);

    // NOTE: In Module 2.1 (RDS Schema), we will connect to RDS Proxy / MySQL here
    // and insert this user profile into the `users` table:
    // INSERT INTO users (cognito_sub, name, email, role, faculty) VALUES (...)
  }

  // MUST return the event object unchanged to Cognito so authentication completes successfully
  return event;
};
