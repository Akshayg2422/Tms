import { EditProfile, ProfileCard, ProfileHeader, ProgressTrackCard, UserStatusCard } from '@Modules'

const UserProfile = () => {

    return (
        <div>
            <ProfileHeader />
            <div className='m-4 mt--6'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <UserStatusCard />
                        <div >
                            <EditProfile />
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <ProfileCard />
                        <ProgressTrackCard />

                    </div>
                </div>

            </div>

        </div>
    )
}

export { UserProfile }
