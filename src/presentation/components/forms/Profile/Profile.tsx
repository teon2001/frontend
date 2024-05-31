import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, Avatar, SelectChangeEvent } from '@mui/material';
import { useProfileApi } from '@infrastructure/apis/api-management/profile';
import { ProfileDTO } from '@infrastructure/apis/client';
import { useAppSelector } from '@application/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importă imaginile avatarului
import avatar1 from '@presentation/assets/img/3d-illustration-teenager-with-funny-face-glasses.jpg';
import avatar2 from '@presentation/assets/img/7309687.jpg';
import avatar3 from '@presentation/assets/img/9334183.jpg';
import avatar4 from '@presentation/assets/img/9334407.jpg';

// Lista de avatare disponibile
const availableAvatars = [
    { label: 'Avatar 1', value: avatar1 },
    { label: 'Avatar 2', value: avatar2 },
    { label: 'Avatar 3', value: avatar3 },
    { label: 'Avatar 4', value: avatar4 },
];

const ProfileForm: React.FC = () => {
    const { addProfileMutation, updateProfileMutation, getProfileMutation } = useProfileApi();
    const { userId } = useAppSelector(state => state.profileReducer); // Adjust this based on your actual state
    const [profile, setProfile] = useState<ProfileDTO>({
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(Date.now()), // Convert Date.now() to a Date object
        bio: '',
        userId: userId || '',
        avatar: '', // Placeholder for avatar selection
    });
    const [isExistingProfile, setIsExistingProfile] = useState(false);
    const [hasFetchedProfile, setHasFetchedProfile] = useState(false); // Flag to track if we've fetched the profile
    const [isNewUser, setIsNewUser] = useState(false); // Flag to determine if the user is newly registered

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfileMutation.mutation(userId!);
                if (response.response) {
                    setProfile(response.response);
                    setIsExistingProfile(true);
                } else {
                    setIsNewUser(true); // Set the flag to true if the profile was not found
                }
            } catch (error) {
                if (error !== "Entitatea nu a fost gasită!") {
                    // toast.error("Failllllllllled to fetch profile.");
                }
                // console.error('Failed to fetch profile:', error);
                setIsExistingProfile(false);
                setIsNewUser(true); // Set the flag to true if an error occurs
            } finally {
                setHasFetchedProfile(true); // Set flag to true after trying to fetch profile
            }
        };

        if (userId && !hasFetchedProfile) {
            // fetchProfile();
        }
    }, [userId, hasFetchedProfile, getProfileMutation]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (isExistingProfile) {
                await updateProfileMutation.mutation(profile);
                toast.success("Profile updated successfully!");
            } else {
                const { id, ...profileWithoutId } = profile; // Omit the id field
                await addProfileMutation.mutation(profileWithoutId as ProfileDTO);
                toast.success("Profile created successfully!");
            }
        } catch (error) {
            toast.error("Failed to save profile.");
            console.error('Failed to save profile:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setProfile(prevState => ({
            ...prevState,
            [name as string]: value,
        }));
    };

    const handleAvatarChange = (event: SelectChangeEvent<string>) => {
        setProfile(prevState => ({
            ...prevState,
            avatar: event.target.value,
        }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '80%', mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Personalizează-ți Profilul
            </Typography>
            <TextField
                label="First Name"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Last Name"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Select Avatar
            </Typography>
            <Select
                name="avatar"
                value={profile.avatar || ''}
                onChange={handleAvatarChange}
                fullWidth
                margin="none"
            >
                {availableAvatars.map((avatar) => (
                    <MenuItem key={avatar.value} value={avatar.value}>
                        {avatar.label}
                    </MenuItem>
                ))}
            </Select>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Avatar
                    src={profile.avatar || ''}
                    alt="Selected Avatar"
                    sx={{ width: 100, height: 100 }}
                />
            </Box>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Save Profile
            </Button>
            <ToastContainer />
        </Box>
    );
};

export default ProfileForm;
