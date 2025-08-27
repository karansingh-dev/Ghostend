docker build \
  -t ghostend \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard \
  .
