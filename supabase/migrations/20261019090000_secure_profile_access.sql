
-- Khel Sankalp: restrict profile access

-- Remove the policy that allows everyone to read every profile.
DROP POLICY IF EXISTS "profiles_read_all"
ON public.profiles;

-- Allow users to read their own profile.
-- Allow approved sports staff to read profiles when needed.
CREATE POLICY "profiles_select_own_or_approved_staff"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = id
  OR public.has_role(auth.uid(), 'superadmin'::public.app_role)
  OR public.has_role(auth.uid(), 'sports_head'::public.app_role)
  OR public.has_role(auth.uid(), 'core_team'::public.app_role)
);

-- Remove anonymous table-level read access.
REVOKE SELECT ON TABLE public.profiles FROM anon;
